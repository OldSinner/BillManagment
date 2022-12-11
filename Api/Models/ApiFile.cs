namespace Api.Models;
public class ApiFile
{
    public byte[]? FileContents { get; set; }
    public string ContentType { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
}