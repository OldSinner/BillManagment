using Api.Models;
using Api.Models.Dtos;
using Api.Models.Dtos.Login;

namespace Api.Interfaces
{
    public interface IAuthService
    {
        public Task<ServiceResponse<int>> RegisterUser(UserRegisterDto user);
        public Task<ServiceResponse<LoginResponse>> LoginUser(LoginDto dto);
    }
}