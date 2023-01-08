namespace Lab5.BLL.Infrastructure.Exceptions;

public class ProjectServiceException: Exception
{
    public ProjectServiceException()
    {
    }

    public ProjectServiceException(string message)
        : base(message)
    {
    }
}