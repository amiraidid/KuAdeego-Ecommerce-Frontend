import React, { useState, useContext } from "react";
import Image from "next/image";

// INTERNAL IMPORT
import Style from "./Filter.module.css";
import images from "../../assets";
import { ChatAppContect } from "../../Context/ChatAppContext";
import { Model } from "../index";

const Filter = () => {
  const {  addFriends, clearChat, userLists } = useContext(ChatAppContect);

  // USESTATE
  const [addFriend, setAddFriend] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFriends, setFilteredFriends] = useState([]);

  // Handler for clear chat
  const handleClearChat = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear the chat?"
    );
    if (confirmClear) {
      clearChat();
    }
  };

  // Handler for searching friends
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredFriends([]);
      return;
    }

    const results = userLists.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFriends(results);
  };

  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <button onClick={handleSearch}>
              <Image src={images.search} alt="image" width={20} height={20} />
            </button>
            <input
              type="text"
              placeholder="Search friends.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <button onClick={handleClearChat}>
            <Image src={images.clear} alt="clear" width={20} height={20} />
            CLEAR CHAT
          </button>
          <button onClick={() => setAddFriend(true)}>
            <Image src={images.user} alt="add friend" width={20} height={20} />
            ADD FRIEND
          </button>
        </div>
      </div>

      {/* Display filtered friends if search query is present */}
      {searchQuery && (
        <div className={Style.Filter_results}>
          {filteredFriends.length > 0 ? (
            filteredFriends.map((user) => (
              <div key={user.accountAddress} className={Style.Filter_result_item}>
                {user.name}
              </div>
            ))
          ) : (
            <div>No friends found</div>
          )}
        </div>
      )}

      {/* MODEL COMPONENT */}
      {addFriend && (
        <div className={Style.Filter_model}>
          <Model
            openBox={setAddFriend}
            title="WELCOME TO"
            head="CHAT BUDDY"
            info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sit doloribus quod vel expedita, dicta voluptatibus, nemo, deserunt minima quis recusandae porro officiis modi fugiat libero tempora corporis necessitatibus itaque!"
            smallInfo="Kindly Select Your Friend Name & Address.."
            image={images.hero}
            functionName={addFriends}
          />
        </div>
      )}
    </div>
  );
};

export default Filter;