using Microsoft.AspNetCore.SignalR;

namespace NG_NET_CHAT.Hubs
{
    public class ChatHub : Hub
    {
        static readonly Dictionary<string, UserInfo> Users = new Dictionary<string, UserInfo>();
        public async Task Register(string username)
        {

            var indexExistingUser = Users.Keys.ToList().IndexOf(username);
            if (indexExistingUser < 0)
            {
                Users.Add(username,
                    new UserInfo()
                    {
                        ConnectionId = this.Context.ConnectionId,
                        UserId = username
                    });
            }

            await Clients.All.SendAsync(WebSocketActions.USER_JOINED, username);
        }

        public async Task Leave(string username)
        {
            Users.Remove(username);
            await Clients.All.SendAsync(WebSocketActions.USER_LEFT, username);
        }

        public async Task Send(string username, string message)
        {
            await Clients.All.SendAsync(WebSocketActions.MESSAGE_RECEIVED, username, message);
        }
    }

    public class UserInfo
    {
        public string? UserId { get; set; }
        public string? ConnectionId { get; set; }
    }

    public struct WebSocketActions
    {
        public static readonly string MESSAGE_RECEIVED = "messageReceived";
        public static readonly string USER_LEFT = "userLeft";
        public static readonly string USER_JOINED = "userJoined";
        // public static readonly string SERVER_DOWN = "serverDown";
        // public static readonly string SERVER_UP = "serverUp";
    }
}
