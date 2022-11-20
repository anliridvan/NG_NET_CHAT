namespace Chat.Entity.Def
{
    public class DBEntityExt<T> : DBEntity where T : class, new()
    {
        public T ExtendedData { get; set; } = new T();
    }
}
