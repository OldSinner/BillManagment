using System.Security.Claims;
using Api.Interfaces;
using Api.Models;
using Api.Models.Dtos.Auth;
using Api.Models.Dtos.Login;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {

        public IAuthService _authService { get; }
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(UserRegisterDto registerDto)
        {
            if (!ModelState.IsValid || registerDto == null)
            {
                return BadRequest(new ServiceResponse<int>()
                {
                    IsSuccess = false,
                    Data = 1,
                    Errors = ModelState.Values.SelectMany(v => v.Errors).Select(x => x.ErrorMessage).ToList()
                });
            }
            var response = await _authService.RegisterUser(registerDto);
            return response.IsSuccess ? Ok(response) : BadRequest(response);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDto req)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ServiceResponse<int>()
                {
                    IsSuccess = false,
                    Data = 1,
                    Errors = ModelState.Values.SelectMany(v => v.Errors).Select(x => x.ErrorMessage).ToList()
                });
            }
            var response = await _authService.LoginUser(req);
            return response.IsSuccess ? Ok(response) : BadRequest(response);
        }
        [Authorize]
        [HttpPost("password")]
        public async Task<ActionResult> ChangePasswod(ChangePasswordDto req)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ServiceResponse<int>()
                {
                    IsSuccess = false,
                    Data = 1,
                    Errors = ModelState.Values.SelectMany(v => v.Errors).Select(x => x.ErrorMessage).ToList()
                });
            }
            var userId = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;
            var response = await _authService.ChangePassword(userId, req.OldPassword, req.NewPassword);
            return response.IsSuccess ? Ok(response) : BadRequest(response);
        }
        [HttpPost("username")]
        public async Task<ActionResult> ChangeUserName([FromBody] string NewUserName)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ServiceResponse<int>()
                {
                    IsSuccess = false,
                    Data = 1,
                    Errors = ModelState.Values.SelectMany(v => v.Errors).Select(x => x.ErrorMessage).ToList()
                });
            }
            var userId = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;
            var response = await _authService.ChangeUserName(userId, NewUserName);
            return response.IsSuccess ? Ok(response) : BadRequest(response);
        }
    }
}