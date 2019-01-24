import { getCurrentColumnId, getUserId, getUserToken } from '@libs/get_state';

export default function(url) {
    url = encodeURIComponent(url);
    let header = {
        cid: getCurrentColumnId(),
        fid: getUserId(),
        token: getUserToken()
    };
    header = JSON.stringify(header);
    header = encodeURIComponent(header);
    window.open('/tiger/proxyDownload?proxyDownloadUrl=' + url + '&headers=' + header);
}