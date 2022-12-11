namespace Api.Models.Dtos.Login
{
    public class LoginResponse
    {
        public string UserName { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
    }
}