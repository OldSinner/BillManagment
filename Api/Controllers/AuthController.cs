using Api.Interfaces;
using Api.Models;
using Api.Models.Dtos.Login;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
            if (!ModelState.IsValid)
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
    }
}