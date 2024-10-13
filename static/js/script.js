console.log('%cCopyright © 2024 lvdpub.com',
    'background-color: #ff00ff; color: white; font-size: 24px; font-weight: bold; padding: 10px;'
);
console.log('%c   /\\_/\\', 'color: #8B4513; font-size: 20px;');
console.log('%c  ( o.o )', 'color: #8B4513; font-size: 20px;');
console.log(' %c  > ^ <', 'color: #8B4513; font-size: 20px;');
console.log('  %c /  ~ \\', 'color: #8B4513; font-size: 20px;');
console.log('  %c/______\\', 'color: #8B4513; font-size: 20px;');

document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

function handlePress(event) {
    this.classList.add('pressed');
}

function handleRelease(event) {
    this.classList.remove('pressed');
}

function handleCancel(event) {
    this.classList.remove('pressed');
}

var buttons = document.querySelectorAll('.projectItem');
buttons.forEach(function (button) {
    button.addEventListener('mousedown', handlePress);
    button.addEventListener('mouseup', handleRelease);
    button.addEventListener('mouseleave', handleCancel);
    button.addEventListener('touchstart', handlePress);
    button.addEventListener('touchend', handleRelease);
    button.addEventListener('touchcancel', handleCancel);
});

function toggleClass(selector, className) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        element.classList.toggle(className);
    });
}

function pop(imageURL) {
    var tcMainElement = document.querySelector(".tc-img");
    if (imageURL) {
        tcMainElement.src = imageURL;
    }
    toggleClass(".tc-main", "active");
    toggleClass(".tc", "active");
}

var tc = document.getElementsByClassName('tc');
var tc_main = document.getElementsByClassName('tc-main');
tc[0].addEventListener('click', function (event) {
    pop();
});
tc_main[0].addEventListener('click', function (event) {
    event.stopPropagation();
});

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

document.addEventListener('DOMContentLoaded', function () {
    var html = document.querySelector('html');
    var themeState = getCookie("themeState") || "Light";
    var tanChiShe = document.getElementById("tanChiShe");

    function changeTheme(theme) {
        tanChiShe.src = "/static/svg/snake-" + theme + ".svg";
        html.dataset.theme = theme;
        setCookie("themeState", theme, 365);
        themeState = theme;
    }

    var Checkbox = document.getElementById('myonoffswitch')
    Checkbox.addEventListener('change', function () {
        if (themeState == "Dark") {
            changeTheme("Light");
        } else if (themeState == "Light") {
            changeTheme("Dark");
        } else {
            changeTheme("Dark");
        }
    });

    if (themeState == "Dark") {
        Checkbox.checked = false;
    }

    changeTheme(themeState);

    var fpsElement = document.createElement('div');
    fpsElement.id = 'fps';
    fpsElement.style.zIndex = '10000';
    fpsElement.style.position = 'fixed';
    fpsElement.style.left = '0';
    document.body.insertBefore(fpsElement, document.body.firstChild);

    var showFPS = (function () {
        var requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };

        var fps = 0,
            last = Date.now(),
            offset, step, appendFps;

        step = function () {
            offset = Date.now() - last;
            fps += 1;

            if (offset >= 1000) {
                last += offset;
                appendFps(fps);
                fps = 0;
            }

            requestAnimationFrame(step);
        };

        appendFps = function (fpsValue) {
            fpsElement.textContent = 'FPS: ' + fpsValue;
        };

        step();
    })();

    // 新增：立即开始隐藏加载动画
    var pageLoading = document.querySelector("#zyyo-loading");
    pageLoading.style.opacity = '0';
    pageLoading.style.transition = 'opacity 0.5s ease';

    // 设置一个短暂的延迟后完全隐藏加载动画
    setTimeout(function () {
        pageLoading.style.display = 'none';
    }, 500); // 500毫秒后完全隐藏，与过渡效果持续时间匹配
});

// 如果需要在页面完全加载后执行额外的操作，可以保留 load 事件
window.addEventListener('load', function() {
    console.log('页面完全加载完毕');
    // 这里可以放置需要在页面完全加载后执行的代码
});

// 移除了原有的 window load 事件监听器
// window.addEventListener('load', function() { ... });


function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
}

function smoothFloat() {
    const witch = document.getElementById('flying-witch');
    const floatDistance = Math.random() * 40 - 20; // -20px 到 20px 之间的随机值
    witch.style.setProperty('--float-distance', `${floatDistance}px`);
    witch.style.animation = 'floatUpDown 4s ease-in-out infinite';
}

// 添加事件监听器
document.getElementById("flying-witch").addEventListener("click", toggleSidebar);

// 初始化浮动动画
smoothFloat();

// 每4秒改变一次浮动距离
setInterval(smoothFloat, 4000);

// 一言加载
fetch('https://v1.hitokoto.cn')
    .then(response => response.json())
    .then(data => {
        document.getElementById('hitokoto').innerText = data.hitokoto;
    })
    .catch(console.error);




document.addEventListener('DOMContentLoaded', function() {
    // 获取随机一言
    function getRandomSentence() {
        fetch("https://v1.hitokoto.cn")
            .then(response => response.json())
            .then(data => {
                const hitokoto = `「${data.hitokoto}」 —— 《${data.from}》`;
                document.getElementById('hitokoto').textContent = hitokoto;
            })
            .catch(error => {
                document.getElementById('hitokoto').textContent = "一言加载失败";
            });
    }

    // 获取天气数据
    function getWeather() {
        fetch("https://devapi.qweather.com/v7/weather/now?location=101310101&key=6ed0f0d9149347cabe664db890e2e0c5")
            .then(response => response.json())
            .then(data => {
                const weather = `${data.now.text}, ${data.now.temp}°C`;
                const iconClass = `qi-${data.now.icon}`; // 根据图标编码生成类名
                const weatherElement = document.getElementById('weather');
                weatherElement.textContent = weather;
                weatherElement.classList.add(iconClass); // 动态添加图标类
            })
            .catch(error => {
                document.getElementById('weather').textContent = "天气加载失败";
            });
    }

    // 获取未来的天气数据（如未来几小时的温度）
    function getWeatherForecast() {
        fetch("https://devapi.qweather.com/v7/weather/24h?location=101310101&key=6ed0f0d9149347cabe664db890e2e0c5")
            .then(response => response.json())
            .then(data => {
                console.log('Weather forecast data:', data);
                const forecastElement = document.getElementById('weather-forecast');
                if (!forecastElement) {
                    console.error('Weather forecast element not found');
                    return;
                }
                forecastElement.innerHTML = '';

                if (data.hourly && data.hourly.length > 0) {
                    // 设置当前天气
                    const currentWeather = data.hourly[0];
                    const iconElement = document.querySelector('.current-weather-icon');
                    const textElement = document.querySelector('.current-weather-text');
                    const tempElement = document.querySelector('.current-weather-temp');

                    if (iconElement) {
                        iconElement.className = `current-weather-icon qi-${currentWeather.icon}`;
                    } else {
                        console.error('Current weather icon element not found');
                    }

                    if (textElement) {
                        textElement.textContent = currentWeather.text;
                    } else {
                        console.error('Current weather text element not found');
                    }

                    if (tempElement) {
                        tempElement.textContent = `${currentWeather.temp}°C`;
                    } else {
                        console.error('Current weather temp element not found');
                    }

                    // 展示未来 7 个小时的数据
                    for (let i = 1; i < 8; i++) {
                        const hourForecast = data.hourly[i];
                        const iconClass = `qi-${hourForecast.icon}`;
                        const temp = `${hourForecast.temp}°C`;
                        const time = new Date(hourForecast.fxTime).getHours() + ":00";

                        const forecastHTML = `
                            <div class="forecast-item">
                                <div class="weather-forecast-icon ${iconClass}"></div>
                                <div class="forecast-time">${time}</div>
                                <div class="forecast-temp">${temp}</div>
                            </div>
                        `;
                        forecastElement.innerHTML += forecastHTML;
                    }
                } else {
                    forecastElement.innerHTML = '未能获取天气预报数据';
                }
            })
            .catch(error => {
                console.error('未来天气加载失败', error);
                const forecastElement = document.getElementById('weather-forecast');
                if (forecastElement) {
                    forecastElement.innerHTML = '加载天气预报失败';
                }
            });
    }

    // 添加点击事件监听器
    const weatherInfo = document.querySelector('.weather-info');
    if (weatherInfo) {
        weatherInfo.addEventListener('click', function() {
            const dropdown = document.getElementById('weather-dropdown');
            if (dropdown) {
                dropdown.style.display = dropdown.style.display === 'none' || dropdown.style.display === '' ? 'block' : 'none';
            }
        });
    }

    // 调用函数
    getWeatherForecast();
    getRandomSentence();
    getWeather();
});


//新闻

// 在您的主JavaScript文件中添加以下代码

// 定义全局变量
const apiBaseUrl = 'https://dailyhot.cute.pp.ua';
let sourceSelect, newsContainer;

// 初始化侧边栏
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = `
        <div id="sidebarContent">
            <h2>热点新闻</h2>
            <select id="sourceSelect">
                <option value="/ithome-xijiayi">IT之家-EPIC</option>
                <!-- 其他新闻源选项将通过JavaScript动态添加 -->
            </select>
            <div id="newsContainer"></div>
        </div>
    `;

    sourceSelect = document.getElementById('sourceSelect');
    newsContainer = document.getElementById('newsContainer');

    const routes = [
        {"name": "HellGithub", "path": "/hellogithub"},
        {"name": "V2EX", "path": "/v2ex"},
        {"name": "澎湃", "path": "/thepaper"},
        {"name": "36氪", "path": "/36kr"},
        {"name": "头条", "path": "/toutiao"},
        {"name": "抖音", "path": "/douyin"},
        {"name": "百度", "path": "/baidu"},
        {"name": "知乎", "path": "/zhihu"},
        {"name": "少数派", "path": "/sspai"},
        {"name": "微信读书", "path": "/weread"},
        {"name": "哔哩哔哩", "path": "/bilibili"},
        {"name": "豆瓣电影", "path": "/douban-movie"},
        {"name": "百度贴吧", "path": "/tieba"},
        // 添加更多新闻源...
    ];

    routes.forEach(route => {
        const option = document.createElement('option');
        option.value = route.path;
        option.textContent = route.name;
        sourceSelect.appendChild(option);
    });

    sourceSelect.addEventListener('change', loadNews);

    // 初始加载新闻
    loadNews();
}

function loadNews() {
    const selectedSource = sourceSelect.value;
    const url = `${apiBaseUrl}${selectedSource}?rss=true&limit=10`;

    newsContainer.innerHTML = '<p>加载中...</p>';

    fetch(url)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const items = xmlDoc.getElementsByTagName("item");
            
            newsContainer.innerHTML = '';
            
            for (let item of items) {
                const title = item.getElementsByTagName("title")[0].textContent;
                const link = item.getElementsByTagName("link")[0].textContent;
                
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                newsItem.innerHTML = `
                    <h3>${title}</h3>
                    <a href="${link}" target="_blank">阅读更多</a>
                `;
                newsContainer.appendChild(newsItem);
            }
        })
        .catch(error => {
            console.error('Error loading news:', error);
            newsContainer.innerHTML = '<p>加载新闻时出错，请稍后再试。</p>';
        });
}

// 在文档加载完成后初始化侧边栏
document.addEventListener('DOMContentLoaded', initSidebar);