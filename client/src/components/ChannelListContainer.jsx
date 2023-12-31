import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelSearch, TeamChannelList, TeamChannelPreview , ChannelMemList } from './';
import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'

const cookies = new Cookies();

const SideBar = ({ logout }) => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={HospitalIcon} alt="Hospital" width="30" />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logout}>
                <img src={LogoutIcon} alt="Logout" width="30" />
            </div>
        </div>
    </div>
);

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">Doc-Pat Chatter</p>
    </div>
)

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
    const { client } = useChatContext();

    const logout = () => {
        console.log(cookies.getAll());
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');
        cookies.remove('role');
        console.log(cookies.getAll());
        window.location.reload();
    }

    const filters = { members: { $in: [client.userID] } };

    return (
        <>
            <SideBar logout={logout} />
            <div className="channel-list__list__wrapper">
                <CompanyHeader />
                <ChannelSearch setToggleContainer={setToggleContainer} />
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            type="team"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType} 
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview 
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="team"
                        />
                    )}
                />
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={customChannelMessagingFilter}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType} 
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview 
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="messaging"
                        />
                    )}
                />
            </div>
        </>
    );
}
const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
    const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
            <div className="channel-list__container">
              <ChannelListContent 
                setIsCreating={setIsCreating} 
                setCreateType={setCreateType} 
                setIsEditing={setIsEditing} 
              />
            </div>

            <div className="channel-list__container-responsive"
                style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
              >
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
                </div>
                <ChannelListContent 
                setIsCreating={setIsCreating} 
                setCreateType={setCreateType} 
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
              />
            </div>
            <div>
              
            </div>
        </>
    )

}

// const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing , isCreating }) => {
//     const [toggleContainer, setToggleContainer] = useState(false);
//     const logout = () => {
//         cookies.remove("token");
//         cookies.remove('userId');
//         cookies.remove('username');
//         cookies.remove('fullName');
//         cookies.remove('avatarURL');
//         cookies.remove('hashedPassword');
//         cookies.remove('phoneNumber');

//         window.location.reload();
//     }
//     return (
//         <>
//         <SideBar logout ={logout} />
//         <div className='channel-list__list__wrapper'>
//             <CompanyHeader/>
//             <ChannelSearch/>
//             <ChannelList 
//                     filters={{}}
//                     channelRenderFilterFn={customChannelTeamFilter}
//                     List={(listProps) => (
//                         <TeamChannelList 
//                             {...listProps}
//                             type= "team"
//                             isCreating={isCreating}
//                             setIsCreating={setIsCreating}
//                             setCreateType={setCreateType}
//                             setIsEditing={setIsEditing}

//                             />
//                     )}
//                     Preview={(previewProps) => (
//                         <TeamChannelPreview 
//                             {...previewProps}
//                             // setIsCreating={setIsCreating}
//                             // setIsEditing={setIsEditing}
//                             // setToggleContainer={setToggleContainer}
//                             type="team"
//                         />
//          )}
// />
//              <ChannelList 
//                     filters={{}}
//                     channelRenderFilterFn={customChannelMessagingFilter}
//                     List={(listProps) => (
//                         <TeamChannelList 
//                             {...listProps}
//                             type= "messaging"
//                             isCreating={isCreating}
//                             setIsCreating={setIsCreating}
//                             setCreateType={setCreateType}
//                             setIsEditing={setIsEditing}
//                             />
//                     )}
//                     Preview={(previewProps) => (
//                         <TeamChannelPreview 
//                             {...previewProps}
//                             // setIsCreating={setIsCreating}
//                             // setIsEditing={setIsEditing}
//                             // setToggleContainer={setToggleContainer}
//                             type="messaging"
//                         />
//          )}
// />     
//          </div>
//              {/* <div className="channel-list__container">
//               <ChannelListContent 
//                 setIsCreating={setIsCreating} 
//                 setCreateType={setCreateType} 
//                 setIsEditing={setIsEditing} 
//               />
//             </div>

//             <div className="channel-list__container-responsive"
//                 style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
//             >
//                 <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
//                 </div>
//                 <ChannelListContent 
//                 setIsCreating={setIsCreating} 
//                 setCreateType={setCreateType} 
//                 setIsEditing={setIsEditing}
//                 setToggleContainer={setToggleContainer}
//               />
//             </div> */}
//         </> 
//     )

// }

export default ChannelListContainer;
