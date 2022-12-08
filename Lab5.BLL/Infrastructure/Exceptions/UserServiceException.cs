namespace Lab5.BLL.Infrastructure.Exceptions;

public class UserServiceException: Exception
{
    public UserServiceException()
    {
    }

    public UserServiceException(string message)
        : base(message)
    {
    }
}