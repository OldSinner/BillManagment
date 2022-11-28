using Api.Models;
using Api.Models.Dtos;
using Api.Models.Dtos.Login;

namespace Api.Interfaces
{
    public interface IAuthService
    {
        Task<ServiceResponse<int>> RegisterUser(UserRegisterDto user);
        Task<ServiceResponse<LoginResponse>> LoginUser(LoginDto dto);
        Task<ServiceResponse> ChangePassword(string id, string oldPassword, string newPassword);
        Task<ServiceResponse> ChangeUserName(string id, string username);
    }
}