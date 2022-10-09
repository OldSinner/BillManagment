using Api.Data;
using Api.Interfaces;
using Api.Models;
using Api.Models.Dtos.Bill;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class BillService : IBillService
    {
        private readonly Context _context;

        public BillService(Context context)
        {
            _context = context;
        }
        public async Task<ServiceResponse<BillResponse>> AddBill(BillDto bill, string userId)
        {
            try
            {
                Guid userGuid;
                var parseSuccess = Guid.TryParse(userId, out userGuid);
                if (!parseSuccess)
                {
                    return new ServiceResponse<BillResponse>()
                    {
                        IsSuccess = false,
                        Errors = new List<string>() { "UserId is not valid" }
                    };
                }

                if (bill == null)
                {
                    return new ServiceResponse<BillResponse>()
                    {
                        IsSuccess = false,
                        Data = null,
                        Errors = new List<string>() { "Bill not found" }
                    };
                }

                if (String.IsNullOrWhiteSpace(bill.Title))
                {
                    return new ServiceResponse<BillResponse>()
                    {
                        IsSuccess = false,
                        Data = null,
                        Errors = new List<string>() { "Title is required" }
                    };
                }
                var user = await _context.Users.Where(x => x.Id.ToString() == userId).FirstOrDefaultAsync();
                if (user == null)
                {
                    return new ServiceResponse<BillResponse>()
                    {
                        IsSuccess = false,
                        Data = null,
                        Errors = new List<string>() { "User not found" }
                    };
                }

                var category = await _context.Category.Where(x => x.Id.ToString() == bill.CategoryId).FirstOrDefaultAsync();
                if (category == null)
                {
                    return new ServiceResponse<BillResponse>()
                    {
                        IsSuccess = false,
                        Data = null,
                        Errors = new List<string>() { "Category not found" }
                    };
                }


                var billToAdd = new Bill()
                {
                    Id = Guid.NewGuid(),
                    Owner = user,
                    Amount = (float)Math.Round(bill.Amount, 2),
                    Category = category,
                    CreatedDate = DateTime.Now,
                    LastModified = DateTime.Now,
                    Title = bill.Title
                };

                _context.Bill.Add(billToAdd);
                await _context.SaveChangesAsync();

                billToAdd.Owner = null;
                return new ServiceResponse<BillResponse>()
                {
                    IsSuccess = true,
                    Data = billToAdd.ToBillResponse(),
                    Errors = null
                };
            }
            catch (Exception ex)
            {
                return new ServiceResponse<BillResponse>()
                {
                    IsSuccess = false,
                    Errors = new List<string>() { ex.Message },
                    Data = null
                };
            }
        }

        public async Task<ServiceResponse<int>> DeleteBill(string id, string userId)
        {
            try
            {
                Guid userGuid;
                var parseSuccess = Guid.TryParse(userId, out userGuid);
                if (!parseSuccess)
                {
                    return new ServiceResponse<int>()
                    {
                        IsSuccess = false,
                        Errors = new List<string>() { "UserId is not valid" }
                    };
                }

                Guid billGuid;
                parseSuccess = Guid.TryParse(id, out billGuid);
                if (!parseSuccess)
                {
                    return new ServiceResponse<int>()
                    {
                        IsSuccess = false,
                        Errors = new List<string>() { "BillId is not valid" }
                    };
                }

                var user = await _context.Users.Where(x => x.Id == userGuid).FirstOrDefaultAsync();
                if (user == null)
                {
                    return new ServiceResponse<int>()
                    {
                        IsSuccess = false,
                        Data = 0,
                        Errors = new List<string>() { "User not found" }
                    };
                }

                var bill = await _context.Bill.Where(x => x.Id == billGuid).FirstOrDefaultAsync();
                if (bill == null)
                {
                    return new ServiceResponse<int>()
                    {
                        IsSuccess = false,
                        Data = 0,
                        Errors = new List<string>() { "Bill not found" }
                    };
                }

                _context.Bill.Remove(bill);
                await _context.SaveChangesAsync();

                return new ServiceResponse<int>()
                {
                    IsSuccess = true,
                    Data = 1,
                    Errors = null
                };
            }
            catch (Exception ex)
            {
                return new ServiceResponse<int>()
                {
                    IsSuccess = false,
                    Data = 0,
                    Errors = new List<string>() { ex.Message
    }
                };
            }
        }

        public async Task<ServiceResponse<List<BillResponse>>> GetUserBills(string userId)
        {
            try
            {
                Guid userGuid;
                var parseSuccess = Guid.TryParse(userId, out userGuid);
                if (!parseSuccess)
                {
                    return new ServiceResponse<List<BillResponse>>()
                    {
                        IsSuccess = false,
                        Errors = new List<string>() { "UserId is not valid" }
                    };
                }

                var user = await _context.Users.Where(x => x.Id == userGuid).FirstOrDefaultAsync();
                if (user == null)
                {
                    return new ServiceResponse<List<BillResponse>>()
                    {
                        IsSuccess = false,
                        Data = null,
                        Errors = new List<string>() { "User not found" }
                    };
                }
                var bills = await _context.Bill.Where(x => x.Owner.Id == user.Id).Include(x => x.Category).ToListAsync();
                List<BillResponse> billResponses = new List<BillResponse>();

                foreach (var bill in bills)
                {
                    billResponses.Add(bill.ToBillResponse());
                }

                return new ServiceResponse<List<BillResponse>>()
                {
                    IsSuccess = true,
                    Data = billResponses,
                    Errors = null
                };
            }
            catch (Exception ex)
            {
                return new ServiceResponse<List<BillResponse>>()
                {
                    IsSuccess = false,
                    Data = null,
                    Errors = new List<string>() { ex.Message }
                };
            }
        }

        public async Task<ServiceResponse<BillResponse>> UpdateBill(BillDto dto, string userId)
        {
            try
            {
                Guid userGuid;
                var parseSuccess = Guid.TryParse(userId, out userGuid);
                if (!parseSuccess)
                {
                    return new ServiceResponse<BillResponse>()
                    {
                        IsSuccess = false,
                        Errors = new List<string>() { "UserId is not valid" }
                    };
                };

                var user = await _context.Users.Where(x => x.Id == userGuid).FirstOrDefaultAsync();
                if (user == null)
                {
                    return new ServiceResponse<BillResponse>()
                    {
                        IsSuccess = false,
                        Data = null,
                        Errors = new List<string>() { "User not found" }
                    };
                }

                Guid billGuid;
                parseSuccess = Guid.TryParse(dto.Id, out billGuid);
                if (!parseSuccess)
                {
                    return new ServiceResponse<BillResponse>()
                    {
                        IsSuccess = false,
                        Errors = new List<string>() { "GuidId is not valid" }
                    };
                };

                var bill = await _context.Bill.Where(x => x.Id == billGuid).FirstOrDefaultAsync();
                if (bill == null)
                {
                    return new ServiceResponse<BillResponse>()
                    {
                        IsSuccess = false,
                        Data = null,
                        Errors = new List<string>() { "Bill not found" }
                    };
                }

                Guid categoryId;
                parseSuccess = Guid.TryParse(dto.CategoryId, out categoryId);
                if (!parseSuccess)
                {
                    return new ServiceResponse<BillResponse>()
                    {
                        IsSuccess = false,
                        Errors = new List<string>() { "CategoryId is not valid" }
                    };
                };

                var category = await _context.Category.Where(x => x.Id == categoryId).FirstOrDefaultAsync();
                if (category == null)
                {
                    return new ServiceResponse<BillResponse>()
                    {
                        IsSuccess = false,
                        Data = null,
                        Errors = new List<string>() { "Category not found" }
                    };
                }


                bill.Title = dto.Title;
                bill.Amount = (float)Math.Round(dto.Amount, 2);
                bill.LastModified = DateTime.Now;
                bill.Category = category;

                _context.Bill.Update(bill);
                await _context.SaveChangesAsync();

                return new ServiceResponse<BillResponse>()
                {
                    IsSuccess = true,
                    Data = bill.ToBillResponse(),
                    Errors = null
                };
            }
            catch (Exception ex)
            {
                return new ServiceResponse<BillResponse>()
                {
                    IsSuccess = false,
                    Data = null,
                    Errors = new List<string>() { ex.Message }
                };
            }
        }
    }
}