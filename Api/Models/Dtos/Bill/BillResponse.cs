namespace Api.Models.Dtos.Bill
{
    public class BillResponse
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public float Amount { get; set; }
        public Category Category { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastModified { get; set; }
    }
}