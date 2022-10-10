using System.Security.Claims;
using Api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StatisticController : ControllerBase
    {
        private readonly IStatisticService _statisticService;

        public StatisticController(IStatisticService statisticService)
        {
            _statisticService = statisticService;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetStatistic([FromQuery] DateTime from, [FromQuery] DateTime to, [FromQuery] string categoryId)
        {
            var response = await _statisticService.GetBills(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, from, to, categoryId);
            return response.IsSuccess ? Ok(response) : BadRequest(response);
        }

    }
}