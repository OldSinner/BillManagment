namespace Api.Models.Dtos.Bill
{
    public class BillResponse
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public float Amount { get; set; }
        public Category Category { get; set; } = new Category();
        public DateTime CreatedDate { get; set; }
        public DateTime LastModified { get; set; }
    }
}