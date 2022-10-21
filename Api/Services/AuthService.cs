using System.Text;
using Api.Data;
using Api.Interfaces;
using Api.Models;
using Api.Models.Dtos;
using Api.Models.Dtos.Login;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class AuthService : IAuthService
    {
        private readonly Context _context;
        private readonly IConfiguration _config;
        private readonly IJWTAuth _auth;

        public AuthService(Context context, IConfiguration config, IJWTAuth auth)
        {
            _context = context;
            _config = config;
            _auth = auth;
        }

        public async Task<ServiceResponse<LoginResponse>> LoginUser(LoginDto dto)
        {
            try
            {
                var user = await _context.Users.Where(x => x.Email.ToUpper() == dto.email.ToUpper()).Include(x => x.Role).FirstOrDefaultAsync();

                if (user == null)
                    return new ServiceResponse<LoginResponse>()
                    {
                        IsSuccess = false,
                        Data = null,
                        Errors = new List<string>() { "Wrong Email" }
                    };

                PasswordHasher(dto.password, out byte[] hashedReqPassword);

                if (!VerifyPassword(user.Password, hashedReqPassword))
                    return new ServiceResponse<LoginResponse>()
                    {
                        IsSuccess = false,
                        Data = null,
                        Errors = new List<string>() { "Wrong Password" }
                    };

                // Jeśli po drodze wykonywannia kodu, nie doszło do błędu, zwaracane są podstawowe informacje o uzytkowniku wraz z wygenerowanym
                // dlaniego tokenem
                return new ServiceResponse<LoginResponse>()
                {
                    IsSuccess = true,
                    Errors = null,
                    Data = new LoginResponse()
                    {
                        Token = await _auth.GenerateJsonWebToken(user),
                        UserName = user.FirstName
                    }
                };
            }

            // Jeśli wystąpił błąd wewnetrzny lub błąd na poziomie z komunikacjami z bazą dabnych, zwracamy wiadomość błędu
            catch (Exception ex)
            {
                return new ServiceResponse<LoginResponse>()
                {
                    IsSuccess = false,
                    Data = null,
                    Errors = new List<string>() { ex.Message }
                };
            }
        }

        public async Task<ServiceResponse<int>> RegisterUser(UserRegisterDto user)
        {
            bool isError = false;
            //Weryfikacja czy hasło ma wystarczającą liczbe znaków
            if (user.Password.Count() < 6)
            {
                return new ServiceResponse<int>()
                {
                    IsSuccess = false,
                    Data = 1,
                    Errors = new List<string> { "Hasło ma za mało znaków" }
                };
            }

            //Walidacja danych
            if (String.IsNullOrWhiteSpace(user.FirstName)) isError = true;
            if (String.IsNullOrWhiteSpace(user.LastName)) isError = true;
            if (String.IsNullOrWhiteSpace(user.Email)) isError = true;

            //Jeśli walidacja jest niepoprawna
            if (isError)
                return new ServiceResponse<int>()
                {
                    IsSuccess = false,
                    Data = 1,
                    Errors = new List<string> { "Wszystkie pola muszą być wypełnioe" }
                };


            //Jeśli hasło się zgadza, dokonywane jest hashowanie hasła
            PasswordHasher(user.Password, out byte[] hashedPassword);

            //Znajdowana jest w bazie danych rola która została przekazana w DTO
            var role = await _context.Role.Where(x => x.Name == "USER").FirstOrDefaultAsync();

            //Jesli nie odnaleziono roli, zwracany jest błąd
            if (role == null)
            {
                return new ServiceResponse<int>()
                {
                    IsSuccess = false,
                    Data = 1,
                    Errors = new List<string> { "Wrong Role parsed!" }
                };
            }

            // Tworzy się nowy obiekt klasy Employee na podstawie DTO oraz
            // wcześniej znalezionej roli i hasowanego hasła
            var usr = new User()
            {
                Id = Guid.NewGuid(),
                FirstName = user.FirstName,
                LastName = user.LastName,
                BirthDate = user.BirthDate,
                Email = user.Email,
                Password = hashedPassword,
                Role = role
            };

            //Dodawanie użytkownika do bazy danych i zapisanie zmian
            _context.Users.Add(usr);
            await _context.SaveChangesAsync();
            return new ServiceResponse<int>()
            {
                IsSuccess = true,
                Data = 0,
                Errors = null
            };
        }


        private void PasswordHasher(string password, out byte[] hash)
        {
            var passwordBytes = System.Text.Encoding.UTF8.GetBytes(password);
            using (var hmac = new System.Security.Cryptography.HMACSHA512(Encoding.UTF8.GetBytes(_config["Password:Secret"])))
            {
                hash = hmac.ComputeHash(passwordBytes);
            }
        }

        private bool VerifyPassword(byte[] orginalPassword, byte[] passwordHash)
        {
            for (int i = 0; i < orginalPassword.Length; i++)
            {
                if (orginalPassword[i] != passwordHash[i])
                {
                    return false;
                }

            }
            return true;
        }
    }
}