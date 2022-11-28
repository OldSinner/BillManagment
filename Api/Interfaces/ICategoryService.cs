using Api.Models;
using Api.Models.Dtos.Categories;

namespace Api.Interfaces
{
    public interface ICategoryService
    {
         Task<ServiceResponse<List<CategoryResponse>>> GetUserCategory(string userId);
    }
}