namespace Lab5.BLL.Infrastructure.Exceptions;

public class TaskServiceException: Exception
{
    public TaskServiceException()
    {
    }

    public TaskServiceException(string message)
        : base(message)
    {
    }
}