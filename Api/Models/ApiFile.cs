namespace Api.Models;
public class ApiFile
{
    public byte[] FileContents { get; set; }
    public string ContentType { get; set; }
    public string FileName { get; set; }
}