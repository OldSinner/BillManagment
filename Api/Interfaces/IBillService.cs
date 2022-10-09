using Api.Models;
using Api.Models.Dtos.Bill;

namespace Api.Interfaces
{
    public interface IBillService
    {
        public Task<ServiceResponse<List<BillResponse>>> GetUserBills(string userId);
        public Task<ServiceResponse<BillResponse>> AddBill(BillDto bill, string userId);
        public Task<ServiceResponse<int>> DeleteBill(string id, string userId);
        public Task<ServiceResponse<BillResponse>> UpdateBill(BillDto dto, string userId);
    }
}