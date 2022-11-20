using System.Net;

namespace DotnetMnemoScheme.Exceptions
{
    public class WebApiException: Exception
    {
        public HttpStatusCode StatusCode { get; set; }
        public string Method { get; set; }  
        public string Url { get; set; }

        public WebApiException
        (
            HttpStatusCode statusCode, 
            string method, 
            string url,
            string message
        )
            : base(message) 
        {
            StatusCode = statusCode;
            Method = method;
            Url = url;
        }
    }
}
