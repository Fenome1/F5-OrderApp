namespace Order.Application.ViewModels;

public class AuthResultViewModel
{
    public required string AccessToken { get; set; }
    public required string RefreshToken { get; set; }
    public required UserViewModel UserViewModel { get; set; }
}