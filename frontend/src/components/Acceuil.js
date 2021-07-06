import "./Acceuil.css";
import { useHistory } from "react-router-dom";

function Accueil() {

    let history = useHistory();

    return (
        <div className="component">   
            <h1 className="title">Bienvenue sur le réseau social de Groupomania !</h1>

            <svg width="450" height="217" viewBox="0 0 450 217" fill="none" xmlns="http://www.w3.org/2000/svg" className="test">
            <path d="M450 0.345215H0V216.595H450V0.345215Z" fill="#3C3C3C"/>
            <path d="M50.3679 190.297C43.6671 190.297 38.0575 188.203 33.539 184.014C29.0205 179.825 26.7613 174.595 26.7613 168.326C26.7613 162.17 29.0205 156.984 33.539 152.766C38.0575 148.577 43.6671 146.482 50.3679 146.482C57.0995 146.482 62.8782 148.434 67.704 152.338L61.4335 158.708C58.2061 156.371 54.5175 155.202 50.3679 155.202C46.1261 155.231 42.6989 156.471 40.0861 158.921C37.5042 161.344 36.2132 164.45 36.2132 168.24C36.2132 172.315 37.5195 175.55 40.1323 177.944C42.745 180.337 46.1722 181.534 50.414 181.534C53.8259 181.534 56.4386 180.922 58.2522 179.696V172.173L51.9817 172.216V164.008H67.704V184.484C62.9089 188.36 57.1302 190.297 50.3679 190.297ZM84.6252 161.059V164.307C86.8998 162.17 89.6508 161.101 92.8783 161.101C93.8926 161.101 94.8609 161.173 95.783 161.315L94.3998 169.394C93.3855 168.539 91.9254 168.083 90.0197 168.026C87.868 168.169 86.0699 169.608 84.6252 172.344V190.297H75.8188V161.956L84.6252 161.059ZM115.839 190.597C111.259 190.597 107.433 189.172 104.359 186.322C101.316 183.472 99.7943 179.939 99.7943 175.721C99.7943 171.475 101.316 167.927 104.359 165.077C107.433 162.227 111.259 160.802 115.839 160.802C120.419 160.802 124.246 162.227 127.32 165.077C130.394 167.927 131.931 171.475 131.931 175.721C131.931 179.967 130.394 183.501 127.32 186.322C124.246 189.172 120.419 190.597 115.839 190.597ZM115.839 183.543C118.206 183.543 120.143 182.788 121.649 181.278C123.155 179.796 123.908 177.944 123.908 175.721C123.908 173.498 123.155 171.646 121.649 170.164C120.143 168.653 118.191 167.898 115.793 167.898C113.426 167.898 111.49 168.653 109.984 170.164C108.508 171.646 107.771 173.498 107.771 175.721C107.771 177.944 108.508 179.796 109.984 181.278C111.49 182.788 113.442 183.543 115.839 183.543ZM156.92 179.953V161.059H165.727V190.297H156.92V187.647C154.8 189.414 152.279 190.297 149.359 190.297C145.363 190.297 142.32 189.172 140.23 186.92C138.109 184.669 137.048 182.09 137.048 179.183V161.059H145.901V177.131C145.901 179.069 146.423 180.58 147.469 181.663C148.514 182.746 150.097 183.316 152.218 183.373C154.062 183.259 155.629 182.119 156.92 179.953ZM182.049 202.609L173.242 202.566V161.956L182.049 161.059V163.41C184.415 161.842 186.736 161.059 189.011 161.059C193.837 161.059 197.663 162.526 200.491 165.462C203.35 168.368 204.779 171.774 204.779 175.678C204.779 179.582 203.35 182.988 200.491 185.895C197.663 188.83 193.837 190.297 189.011 190.297C185.845 190.098 183.524 189.3 182.049 187.904V202.609ZM182.049 173.028V177.773C182.479 181.05 184.692 182.974 188.688 183.543C193.729 183.173 196.572 180.751 197.218 176.277C197.003 170.805 194.159 167.969 188.688 167.77C184.692 168.368 182.479 170.121 182.049 173.028ZM225.297 190.597C220.717 190.597 216.905 189.172 213.862 186.322C210.788 183.472 209.252 179.939 209.252 175.721C209.252 171.475 210.788 167.927 213.862 165.077C216.905 162.227 220.717 160.802 225.297 160.802C229.877 160.802 233.703 162.227 236.777 165.077C239.851 167.927 241.388 171.475 241.388 175.721C241.388 179.967 239.851 183.501 236.777 186.322C233.703 189.172 229.877 190.597 225.297 190.597ZM225.297 183.543C227.694 183.543 229.631 182.788 231.106 181.278C232.612 179.796 233.365 177.944 233.365 175.721C233.365 173.498 232.612 171.646 231.106 170.164C229.631 168.653 227.679 167.898 225.251 167.898C222.884 167.898 220.947 168.653 219.441 170.164C217.966 171.646 217.228 173.498 217.228 175.721C217.228 177.944 217.966 179.796 219.441 181.278C220.947 182.788 222.899 183.543 225.297 183.543ZM256.096 171.617V190.297H247.243V161.956L256.096 161.059V163.666C258.063 161.956 260.584 161.101 263.657 161.101C267.623 161.101 270.666 162.213 272.787 164.436C275.092 162.213 278.55 161.101 283.161 161.101C287.156 161.101 290.215 162.213 292.336 164.436C294.426 166.687 295.471 169.28 295.471 172.216V190.297H286.665V174.225C286.665 172.287 286.188 170.776 285.235 169.694C284.282 168.639 282.746 168.083 280.625 168.026C278.873 168.14 277.366 169.209 276.106 171.232C275.983 171.831 275.922 172.444 275.922 173.071V190.297H267.115V174.225C267.115 172.287 266.639 170.776 265.686 169.694C264.733 168.639 263.196 168.083 261.075 168.026C259.139 168.14 257.479 169.337 256.096 171.617ZM307.32 169.565L303.862 164.607C307.858 162.27 312.484 161.101 317.741 161.101C321.521 161.101 324.503 162.07 326.685 164.008C328.898 165.975 330.005 168.896 330.005 172.771V190.297H321.199V187.989C318.617 189.528 316.296 190.297 314.236 190.297C310.056 190.297 306.905 189.471 304.785 187.818C302.694 186.165 301.649 183.885 301.649 180.979C301.649 178.243 302.648 175.806 304.646 173.669C306.613 171.532 309.81 170.463 314.236 170.463C316.296 170.463 318.617 171.047 321.199 172.216V171.318C321.137 169.181 319.446 168.012 316.127 167.813C312.346 167.813 309.411 168.397 307.32 169.565ZM321.199 181.534V178.243C320.369 176.733 318.371 175.977 315.205 175.977C311.424 176.376 309.426 177.744 309.211 180.081C309.426 182.389 311.424 183.643 315.205 183.843C318.371 183.843 320.369 183.073 321.199 181.534ZM346.742 171.745V190.297H337.889V161.956L346.742 161.059V163.709C348.863 161.971 351.383 161.101 354.303 161.101C358.299 161.101 361.342 162.213 363.432 164.436C365.522 166.687 366.567 169.28 366.567 172.216V190.297H357.761V174.225C357.761 172.287 357.239 170.776 356.193 169.694C355.118 168.639 353.519 168.083 351.398 168.026C349.585 168.14 348.033 169.38 346.742 171.745ZM382.797 190.297H373.991V161.059H382.797V190.297ZM373.668 154.091C373.668 155.259 374.083 156.228 374.913 156.998C375.773 157.767 376.941 158.152 378.417 158.152C379.862 158.152 381.014 157.767 381.875 156.998C382.705 156.228 383.12 155.259 383.12 154.091C383.12 152.923 382.705 151.939 381.875 151.142C381.014 150.344 379.831 149.945 378.325 149.945C376.911 149.945 375.773 150.344 374.913 151.142C374.083 151.939 373.668 152.923 373.668 154.091ZM394.554 169.565L391.096 164.607C395.092 162.27 399.718 161.101 404.974 161.101C408.755 161.101 411.752 162.07 413.965 164.008C416.148 165.975 417.239 168.896 417.239 172.771V190.297H408.432V187.989C405.881 189.528 403.576 190.297 401.516 190.297C397.305 190.297 394.155 189.471 392.064 187.818C389.944 186.165 388.883 183.885 388.883 180.979C388.883 178.243 389.882 175.806 391.88 173.669C393.847 171.532 397.059 170.463 401.516 170.463C403.545 170.463 405.85 171.047 408.432 172.216V171.318C408.402 169.181 406.726 168.012 403.407 167.813C399.626 167.813 396.675 168.397 394.554 169.565ZM408.432 181.534V178.243C407.602 176.733 405.604 175.977 402.438 175.977C398.658 176.376 396.66 177.744 396.445 180.081C396.66 182.389 398.658 183.643 402.438 183.843C405.604 183.843 407.602 183.073 408.432 181.534Z" fill="#FD2D01"/>
            <path d="M222 127.696C237.008 127.696 251.078 121.731 261.664 110.771C272.25 99.8118 278.012 85.2455 278.012 69.7082C278.012 54.1709 272.25 39.6047 261.664 28.6453C251.078 17.6859 237.008 11.7207 222 11.7207C206.992 11.7207 192.922 17.6859 182.336 28.6453C171.75 39.6047 165.988 54.1709 165.988 69.7082C165.988 85.2455 171.75 99.8118 182.336 110.771C192.922 121.731 206.992 127.696 222 127.696ZM225.216 117.846C224.144 117.985 223.072 117.985 222 117.985C220.526 117.985 219.052 117.846 217.578 117.707C212.754 109.939 209.136 101.615 206.992 92.8755H230.71C231.514 94.9564 232.988 96.8985 234.73 98.1471C232.452 105.083 229.236 111.604 225.216 117.846V117.846ZM237.946 115.072C240.492 110.216 242.502 105.361 244.11 100.228C247.996 99.3956 251.078 96.6211 252.552 92.8755H262.87C257.51 103.002 248.532 110.91 237.946 115.072ZM268.498 69.7082C268.498 74.2862 267.828 78.7254 266.756 83.0259H252.284C251.48 81.2225 250.14 79.5578 248.532 78.3093C248.8 75.2573 248.934 72.2053 248.934 69.1533C248.934 64.8528 248.666 60.5523 248.13 56.3905H266.622C267.962 60.5523 268.498 65.1303 268.498 69.7082V69.7082ZM262.87 46.541H246.522C244.78 38.911 242.234 31.6973 238.75 24.761C248.934 28.7841 257.51 36.6914 262.87 46.541ZM239.554 69.1533C239.554 71.5117 239.42 73.87 239.286 76.2284C235.534 77.0607 232.452 79.5578 230.978 83.0259H205.116C204.58 78.8642 204.178 74.5636 204.178 70.4019C204.178 67.7661 204.312 65.1303 204.58 62.4945C208.064 61.8008 210.878 59.4425 212.62 56.3905H238.75C239.286 60.5523 239.554 64.8528 239.554 69.1533V69.1533ZM218.516 21.709C219.722 21.5703 220.928 21.5703 222 21.5703C223.34 21.5703 224.68 21.5703 226.02 21.709C230.844 29.4777 234.462 37.8012 236.606 46.541H213.29C212.486 44.1826 211.012 42.1017 209.136 40.5758C211.548 33.9169 214.63 27.6742 218.516 21.709ZM205.786 24.4835C203.508 28.9228 201.498 33.6394 199.89 38.3561C195.736 39.1885 192.386 42.3792 191.046 46.4022H181.264C186.49 36.5527 195.2 28.6453 205.786 24.4835ZM175.502 69.7082C175.502 65.1303 176.172 60.5523 177.378 56.3905H191.984C192.788 57.9165 193.994 59.3038 195.334 60.4136C195.066 63.743 194.798 67.0724 194.798 70.4019C194.798 74.7024 195.066 78.8642 195.602 83.0259H177.378C176.038 78.7254 175.502 74.2862 175.502 69.7082ZM197.21 92.7368C198.952 100.228 201.498 107.58 204.982 114.517C194.798 110.355 186.356 102.586 181.13 92.7368H197.21Z" fill="#FFD7D7"/>
            </svg>

            <div className="component">
                <button className="authButton" onClick={() => history.push("/Inscription")}>Inscription</button>
                <button className="authButton" onClick={() => history.push("/Connexion")}>Connexion</button>
            </div>
        </div> 
    )
}

export default Accueil;