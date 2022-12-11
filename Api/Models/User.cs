using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class User
    {
        [Key]
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        [Required]
        public DateTime BirthDate { get; set; }
        [Required]
        public DateTime RegisterDate { get; set; }
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public byte[]? Password { get; set; }
        [Required]
        public Role Role { get; set; } = new Role();
    }
}