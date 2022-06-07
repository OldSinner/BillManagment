using Api.Data;
using Api.Interfaces;
using Api.Models;
using Api.Models.Dtos.Categories;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly Context _context;
        public CategoryService(Context context)
        {
            _context = context;

        }
        public async Task<ServiceResponse<List<CategoryResponse>>> GetUserCategory(string userId)
        {
            Guid userGuid;
            var parseSuccess = Guid.TryParse(userId, out userGuid);
            if (!parseSuccess)
            {
                return new ServiceResponse<List<CategoryResponse>>()
                {
                    IsSuccess = false,
                    Errors = new List<string>() { "UserId is not valid" }
                };
            }

            var user = await _context.Users.Where(x => x.Id == userGuid).FirstOrDefaultAsync();
            if (user == null)
            {
                return new ServiceResponse<List<CategoryResponse>>()
                {
                    IsSuccess = false,
                    Data = null,
                    Errors = new List<string>() { "User not found" }
                };
            }

            var categories = await _context.Category.Where(x => x.Owner.Id == userGuid || x.Owner == null).ToListAsync();
            var categoryResponse = new List<CategoryResponse>();

            foreach (var category in categories)
            {
                categoryResponse.Add(category.ToCategoryResponse());
            }


            return new ServiceResponse<List<CategoryResponse>>()
            {
                IsSuccess = true,
                Data = categoryResponse,
                Errors = null
            };

        }
    }
}