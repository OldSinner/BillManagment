using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class Role
    {
        [Key]
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}