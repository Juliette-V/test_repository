export const Header = () => {
  return (
    <header className="header">
      <div className="search-input">
        <img src="icon_search.svg" alt="" />
        <input type="text" placeholder="Search transactions, invoices or help" />
      </div>
      <div className="header__menu">
        <button>
          <img src="icon-support.svg" alt="support" />
        </button>
        <button>
          <img src="icon-msgs.svg" alt="messages" />
        </button>
        <button>
          <img src="icon-bell.svg" alt="notifications" />
        </button>
        <div className="vertical-devider" />
        <div className="header__profile">
          <span>John Doe</span>
          <img src="icon-arrow-down.svg" alt="arrow-dpown" />
          <img className="avatar" src="Avatar@2x.png" alt="avatar" />
        </div>
      </div>
    </header>
  );
};
