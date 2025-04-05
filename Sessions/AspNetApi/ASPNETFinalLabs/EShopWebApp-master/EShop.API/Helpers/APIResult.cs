namespace EShop.API
{
    public class APIResult<T>
    {
        public int Status { get; set; }//200, 201,400, 500
        public bool Success { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
    }
}
