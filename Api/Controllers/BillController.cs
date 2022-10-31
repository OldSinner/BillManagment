using System.Security.Claims;
using Api.Interfaces;
using Api.Models;
using Api.Models.Dtos.Bill;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BillController : ControllerBase
    {
        private readonly IBillService _billService;

        public BillController(IBillService billService)
        {
            _billService = billService;
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddBill(BillDto bill)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ServiceResponse<int>()
                {
                    IsSuccess = false,
                    Data = 5,
                    Errors = ModelState.Values.SelectMany(v => v.Errors).Select(x => x.ErrorMessage).ToList()
                });
            }
            var response = await _billService.AddBill(bill, User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return response.IsSuccess ? Ok(response) : BadRequest(response);
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetBills(DateTime from, DateTime to, string category, float fromAmount, float toAmount)
        {
            var response = await _billService.GetUserBills(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, from, to, category, fromAmount, toAmount);
            return response.IsSuccess ? Ok(response) : BadRequest(response);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBill(string id)
        {
            var response = await _billService.DeleteBill(id, User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return response.IsSuccess ? Ok(response) : BadRequest(response);
        }
        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateBill(BillDto bill)
        {
            var response = await _billService.UpdateBill(bill, User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return response.IsSuccess ? Ok(response) : BadRequest(response);
        }

    }
}