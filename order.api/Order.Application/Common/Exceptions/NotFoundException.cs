namespace Order.Application.Common.Exceptions;

public class NotFoundException : Exception
{
    public NotFoundException(string name) : base($"Error {name} was not found")
    {
    }
}