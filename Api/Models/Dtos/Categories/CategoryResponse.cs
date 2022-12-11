namespace Api.Models.Dtos.Categories
{
    public class CategoryResponse
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? IconClassName { get; set; } = string.Empty;
    }
}