
using Api.Models;

namespace Api.Interfaces
{
    public interface IJWTAuth
    {
        public Task<string> GenerateJsonWebToken(User usr);
    }
}