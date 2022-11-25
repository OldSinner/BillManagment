namespace Api.Models
{
    public class ServiceResponse<T> : ServiceResponse
    {
        public T? Data { get; set; }
    }

    public class ServiceResponse
    {
        public bool IsSuccess { get; set; }
        public List<string>? Errors { get; set; }
    }
}