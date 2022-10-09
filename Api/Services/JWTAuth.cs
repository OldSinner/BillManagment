using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Api.Interfaces;
using Api.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class JWTAuth : IJWTAuth
    {
        private readonly IConfiguration _config;

        public JWTAuth(IConfiguration config)
        {
            _config = config;
        }


        public async Task<string> GenerateJsonWebToken(User usr)
        {
            var claims = new List<Claim>() {
                new Claim(ClaimTypes.Email, usr.Email),
                new Claim(ClaimTypes.NameIdentifier, usr.Id.ToString()),
                new Claim(ClaimTypes.Role,usr.Role.Name),
                 new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var handler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["JWTConfig:Secret"]);
            Console.WriteLine("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            Console.WriteLine(_config["JWTConfig:Secret"]);


            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = handler.CreateToken(tokenDescriptor);
            var jwtToken = handler.WriteToken(token);

            return jwtToken;
        }
    }
}