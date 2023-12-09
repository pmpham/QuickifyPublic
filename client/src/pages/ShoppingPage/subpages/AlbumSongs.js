import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node/src/spotify-web-api';
import VerticalAlbum86 from '../../../components/Album/VerticalAlbum86';
import { Scrollbar } from 'react-scrollbars-custom';
import { purple } from '@mui/material/colors';
import PurpleInput from '../../../components/Input/PurpleInput';
import ArtistPage from "./ArtistPage"
import { Typography } from '@mui/material';
import SmallPlaylist from '../../../components/Playlist/SmallPlaylist';

const spotifyApi = new SpotifyWebApi({
    clientId: "fd01b946bd9343d584608c1908851848",
});

// Daniel Gonzalez: displays the songs within a selected album
const AlbumSongs = ({accessToken, albumId}) => {
    const [albumName, setAlbumName] = useState();
    const [albumImg, setAlbumImg] = useState("https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5?v=v2");

    const [songs, setSongs] = useState([]);
    const [artistName, setArtistName] = useState();
    const [artistId, setArtistId] = useState();

    const [activeContent, setActiveContent] = useState(false);

    // css styling for container
    const container = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "15px",
        height: "430px",
        marginTop: "20px",
      };

    //gets access token from Spotify API endpoint
    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    //grabs album info
    useEffect(() => {
        if ((!accessToken, !albumId)) return;
        spotifyApi.getAlbum(albumId).then((data) => {
            setAlbumImg(data.body.images[0]?.url);
            setAlbumName(data.body.name);
            setArtistName(data.body.artists[0]?.name)
        })
    })

    //grabs songs inside of an album
    useEffect(() => {
        if ((!accessToken, !albumId)) return;
        spotifyApi.getAlbumTracks(albumId).then((data) => {
          setSongs(data.body.items);
        })
      })

  return (
    <div>
        {activeContent ? (
            <div></div>
            // <ArtistPage
            //     name={}
            //     profile={}
            //     topSongs={}
            //     albums={}
            //     relatedArtists={}
            // />
        ):(
            <div style={{
                display: "inline-flex",
                height: '515px',
                width: '980px'
            }}>
                {/**Album Image */}
                <img src={albumImg} style={{
                    width: "224px",
                    height: "224px",
                    borderRadius: '8px',
                    marginLeft: '60px',
                    marginTop: 'auto',
                    marginBottom: 'auto'
                }}/>
                <div style={{
                    marginLeft: '32px',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                }}>
                    {/**Album Name and Artist Name */}
                    <Typography variant='h4' style={{
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        width: "300px"
                    }}>{albumName}</Typography>
                    <Typography style={{
                        marginTop: 'auto',
                        marginBottom: 'auto'
                    }}>{artistName}</Typography>
                </div>
                {/**Album Song List */}
                <Scrollbar
                    permanentTrackY={true}
                    contentProps={{ style: container }}
                    thumbYProps={{ style: { background: purple[200] } }}
                    noScrollX={true}
                    trackYProps={{
                        style: {
                        width: "8px",
                        height: "515px",
                        top: "0px",
                        marginLeft: "5px",
                        },
                    }}
                >
                    <div style={{ 
                        content: 'space-between',
                        marginLeft: '32px',
                        overflow: 'hidden'
                    }}>
                        
                        {songs.map((song, index) => (
                            <div style={{padding: '2px'}} key={index}>
                                <SmallPlaylist name={song.name} img={albumImg} size={60}/>
                            </div>
                        ))}
                    </div>
                </Scrollbar>
            </div>
        )}
    </div>
  );
};

export default AlbumSongs;