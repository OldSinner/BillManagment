using Api.Models;
using Api.Models.Dtos.Bill;

namespace Api.Interfaces
{
    public interface IBillService
    {
         Task<ServiceResponse<List<BillResponse>>> GetUserBills(string userId, DateTime from, DateTime to, string category = "ALL", float fromAmount = float.MinValue, float toAmount = float.MaxValue);
         Task<ServiceResponse<BillResponse>> AddBill(BillDto bill, string userId);
         Task<ServiceResponse<int>> DeleteBill(string id, string userId);
         Task<ServiceResponse<BillResponse>> UpdateBill(BillDto dto, string userId);
    }
}