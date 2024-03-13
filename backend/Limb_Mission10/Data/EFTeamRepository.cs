namespace Limb_Mission10.Data
{
    public class EFTeamRepository : ITeamRepository
    {
        private BowlingLeagueContext _context;
        public EFTeamRepository(BowlingLeagueContext temp)
        {

            _context = temp;

        }

        public IEnumerable<Team> Teams => _context.Teams;
    }
}
