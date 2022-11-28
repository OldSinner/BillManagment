
using Api.Models;

namespace Api.Interfaces
{
    public interface IJWTAuth
    {
         Task<string> GenerateJsonWebToken(User usr);
    }
}