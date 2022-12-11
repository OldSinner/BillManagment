
using Api.Models;

namespace Api.Interfaces
{
    public interface IJWTAuth
    {
        string GenerateJsonWebToken(User usr);
    }
}