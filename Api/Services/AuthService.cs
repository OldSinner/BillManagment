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
        private readonly ILogger<AuthService> logger;

        public AuthService(Context context, IConfiguration config, IJWTAuth auth, ILogger<AuthService> logger)
        {
            _context = context;
            _config = config;
            _auth = auth;
            this.logger = logger;
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
                {
                    logger.LogWarning("User {0} tried to login with wrong password", user.Email);
                    return new ServiceResponse<LoginResponse>()
                    {
                        IsSuccess = false,
                        Data = null,
                        Errors = new List<string>() { "Wrong Password" }
                    };
                }

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
                logger.LogError(ex, "Error while login user");
                return new ServiceResponse<LoginResponse>()
                {
                    IsSuccess = false,
                    Data = null,
                    Errors = new List<string>() { ex.Message }
                };
            }
        }

        public async Task<ServiceResponse<int>> RegisterUser(UserRegisterDto dto)
        {
            bool isError = false;
            //Weryfikacja czy hasło ma wystarczającą liczbe znaków
            if (dto.Password.Count() < 6)
            {
                return new ServiceResponse<int>()
                {
                    IsSuccess = false,
                    Data = 1,
                    Errors = new List<string> { "Hasło ma za mało znaków" }
                };
            }

            var user = await _context.Users.Where(x => x.Email.ToUpper() == dto.Email.ToUpper()).FirstOrDefaultAsync();

            if (user != null)
            {
                return new ServiceResponse<int>()
                {
                    IsSuccess = false,
                    Data = 1,
                    Errors = new List<string> { "Użytkownik o podanym adresie email już istnieje" }
                };
            }


            //Walidacja danych
            if (String.IsNullOrWhiteSpace(dto.FirstName)) isError = true;
            if (String.IsNullOrWhiteSpace(dto.LastName)) isError = true;
            if (String.IsNullOrWhiteSpace(dto.Email)) isError = true;

            //Jeśli walidacja jest niepoprawna
            if (isError)
                return new ServiceResponse<int>()
                {
                    IsSuccess = false,
                    Data = 1,
                    Errors = new List<string> { "Wszystkie pola muszą być wypełnioe" }
                };


            //Jeśli hasło się zgadza, dokonywane jest hashowanie hasła
            PasswordHasher(dto.Password, out byte[] hashedPassword);

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
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                BirthDate = dto.BirthDate,
                Email = dto.Email,
                Password = hashedPassword,
                Role = role
            };

            //Dodawanie użytkownika do bazy danych i zapisanie zmian
            logger.LogInformation("Adding new user {0} to database", usr.Email);
            _context.Users.Add(usr);
            await _context.SaveChangesAsync();
            return new ServiceResponse<int>()
            {
                IsSuccess = true,
                Data = 0,
                Errors = null
            };
        }

        public async Task<ServiceResponse> ChangePassword(string email, string oldPassword, string newPassword)
        {
            var user = await _context.Users.Where(x => x.Email.ToUpper() == email.ToUpper()).FirstOrDefaultAsync();

            if (user == null)
                return new ServiceResponse()
                {
                    IsSuccess = false,
                    Errors = new List<string>() { "Wrong Email" }
                };

            PasswordHasher(oldPassword, out byte[] hashedReqPassword);

            if (!VerifyPassword(user.Password, hashedReqPassword))
            {
                logger.LogWarning("User {0} tried to change password with wrong password", user.Email);
                return new ServiceResponse()
                {
                    IsSuccess = false,
                    Errors = new List<string>() { "Wrong Password" }
                };
            }

            PasswordHasher(newPassword, out byte[] hashedNewPassword);
            user.Password = hashedNewPassword;

            _context.Update(user);
            await _context.SaveChangesAsync();

            return new ServiceResponse()
            {
                IsSuccess = true,
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