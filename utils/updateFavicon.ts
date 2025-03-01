import themesList from '@/public/themes.json'
/**
 * Updates the favicon with the current theme colors
 */
export default function updateFavicon(themeName: string) {
  const colors = themesList.find((theme) => theme.name === themeName)
  const mainColor = colors.mainColor
  const bgColor = colors.bgColor
  const subColor = colors.subColor
  const textColor = colors.textColor

  const svgPre = `
        <svg width="100%" height="100%" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
            <style>
              #bg {
                fill: none;
                stroke: ${mainColor};
                stroke-width: 7.49px;
              }
              #fg {
                fill: none;
                stroke: ${bgColor};
                stroke-width: 2.76px;
              }
            </style>
            <g transform="matrix(1,0,0,1,0,-134.314)">
                <g id="favicon" transform="matrix(0.2,0,0,0.32,0,134.314)">
                    <g transform="matrix(1.09868,0,0,1.10761,-32.0919,-3.59777)">
                        <g transform="matrix(30.8506,0,0,19.2816,-2766.95,-3039.17)">
                            <path id="bg" d="M105.325,168.478C110.942,179.712 130.887,164.495 122.361,163.698C115.501,163.057 103.761,190.483 98.952,189.313C87.851,186.613 101.343,182.966 101.893,182.817C105.963,181.718 107.808,181.696 107.164,185.882C106.849,187.925 120.933,185.175 121.47,184.772"/>
                        </g>
                        <g transform="matrix(30.8506,0,0,19.2816,-2766.95,-3039.17)">
                            <path id="fg" d="M105.325,168.478C110.942,179.712 130.887,164.495 122.361,163.698C115.501,163.057 103.761,190.483 98.952,189.313C87.851,186.613 101.343,182.966 101.893,182.817C105.963,181.718 107.808,181.696 107.164,185.882C106.849,187.925 120.933,185.175 121.47,184.772"/>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
        `

  const faviconElement = document.getElementById('favicon')
  if (faviconElement) {
    faviconElement.setAttribute(
      'href',
      'data:image/svg+xml;base64,' + btoa(svgPre)
    )
  } else {
    const newFaviconElement = document.createElement('link')
    newFaviconElement.setAttribute('id', 'favicon')
    newFaviconElement.setAttribute('rel', 'icon')
    newFaviconElement.setAttribute('type', 'image/svg+xml')
    newFaviconElement.setAttribute('href', 'data:image/svg+xml;base64,' + btoa(svgPre))
    document.head.appendChild(newFaviconElement)
  }
}
