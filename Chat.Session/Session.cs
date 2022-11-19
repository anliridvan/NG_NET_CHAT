namespace Chat.Session
{
    public class Session : ISession
    {
        public Guid UserId { get; set; }
        public Guid RoleId { get; set; }
        public string UserName { get; set; }
        public string RoleName { get; set; }
    }
}
