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
        private ILogger<BillService> logger;

        public BillService(Context context, ILogger<BillService> logger)
        {
            _context = context;
            this.logger = logger;
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
                var user = await _context.Users!.Where(x => x.Id.ToString() == userId).FirstOrDefaultAsync();
                if (user == null)
                {
                    return new ServiceResponse<BillResponse>()
                    {
                        IsSuccess = false,
                        Data = null,
                        Errors = new List<string>() { "User not found" }
                    };
                }

                var category = await _context.Category!.Where(x => x.Id.ToString() == bill.CategoryId).FirstOrDefaultAsync();
                if (category == null)
                {
                    return new ServiceResponse<BillResponse>()
                    {
                        IsSuccess = false,
                        Data = null,
                        Errors = new List<string>() { "Category not found" }
                    };
                }

                if (float.IsInfinity(bill.Amount) || float.IsNegativeInfinity(bill.Amount))
                {
                    return new ServiceResponse<BillResponse>()
                    {
                        IsSuccess = false,
                        Data = null,
                        Errors = new List<string>() { "Podana wartośc jest nieprawidłowa" }
                    };
                }

                var billToAdd = new Bill()
                {
                    Id = Guid.NewGuid(),
                    Owner = user,
                    Amount = (float)Math.Round(bill.Amount, 2),
                    Category = category,
                    CreatedDate = bill.Date,
                    LastModified = DateTime.Now,
                    Title = bill.Title
                };

                logger.LogInformation("Adding bill {0} for user {1}", billToAdd.Title, user.Email);
                _context.Bill!.Add(billToAdd);
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
                logger.LogError(ex, "Error while adding bill");
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

                var user = await _context.Users!.Where(x => x.Id == userGuid).FirstOrDefaultAsync();
                if (user == null)
                {
                    return new ServiceResponse<int>()
                    {
                        IsSuccess = false,
                        Data = 0,
                        Errors = new List<string>() { "User not found" }
                    };
                }

                var bill = await _context.Bill!.Where(x => x.Id == billGuid).FirstOrDefaultAsync();
                if (bill == null)
                {
                    return new ServiceResponse<int>()
                    {
                        IsSuccess = false,
                        Data = 0,
                        Errors = new List<string>() { "Bill not found" }
                    };
                }

                logger.LogInformation("Deleting bill {0} for user {1}", bill.Title, user.Email);
                _context.Bill!.Remove(bill);
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
                logger.LogError(ex, "Error while deleting bill");
                return new ServiceResponse<int>()
                {
                    IsSuccess = false,
                    Data = 0,
                    Errors = new List<string>() { ex.Message
    }
                };
            }
        }

        public async Task<ServiceResponse<List<BillResponse>>> GetUserBills(string userId, DateTime from, DateTime to, string category = "ALL", float fromAmount = float.MinValue, float toAmount = float.MaxValue)
        {
            try
            {
                if (from.Year == 1)
                {
                    from = DateTime.MinValue;
                }
                if (to.Year == 1)
                {
                    to = DateTime.MaxValue;
                }

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

                var user = await _context.Users!.Where(x => x.Id == userGuid).FirstOrDefaultAsync();
                if (user == null)
                {
                    return new ServiceResponse<List<BillResponse>>()
                    {
                        IsSuccess = false,
                        Data = null,
                        Errors = new List<string>() { "User not found" }
                    };
                }
                var bills = await _context.Bill!.Where(x => x.Owner!.Id == user.Id && Math.Abs(x.Amount) >= fromAmount && Math.Abs(x.Amount) >= toAmount && x.CreatedDate >= from && x.CreatedDate <= to).Include(x => x.Category).ToListAsync();
                List<BillResponse> billResponses = new List<BillResponse>();

                foreach (var bill in bills)
                {
                    if (category == "ALL")
                    {
                        billResponses.Add(bill.ToBillResponse());
                    }
                    else
                    {
                        if (bill.Category.Id.ToString() == category)
                        {
                            billResponses.Add(bill.ToBillResponse());
                        }
                    }
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
                }

                var user = await _context.Users!.Where(x => x.Id == userGuid).FirstOrDefaultAsync();
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
                }

                var bill = await _context.Bill!.Where(x => x.Id == billGuid).FirstOrDefaultAsync();
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
                }

                var category = await _context.Category!.Where(x => x.Id == categoryId).FirstOrDefaultAsync();
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
                bill.CreatedDate = dto.Date;

                _context.Bill!.Update(bill);

                logger.LogInformation("Updating bill {0} for user {1}", bill.Id, user.Email);
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
                logger.LogError(ex, "Error while updating bill");
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