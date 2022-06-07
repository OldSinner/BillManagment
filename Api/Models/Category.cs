using System.ComponentModel.DataAnnotations;
using Api.Models.Dtos.Categories;

namespace Api.Models
{
    public class Category
    {
        [Key]
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        public Icon? iconClassName { get; set; }
        public User? Owner { get; set; }

        public CategoryResponse ToCategoryResponse()
        {
            return new CategoryResponse()
            {
                Id = Id.ToString(),
                Name = Name,
                IconClassName = iconClassName?.className
            };
        }
    }
}