/**
 * Created by zhoulijun on 2018/5/11.
 */
"use strict";

class _WebSocketBuilder {
  buildWs(url, handleErr) {
    return {
      status: false,
      url: url,
      onOpen: null,
      onMessage: null,
      handles: {},

      isConnected: function () {
        return this.status;
      },

      reLoad: function () {
        this.connect(this.url, this.onOpen, this.onMessage)
      },

      handleMessage: function (msg) {
        const data = JSON.parse(msg.data);
        switch (data.action) {
          case "Error": {
            if (handleErr) {
              handleErr(data);
            } else {
              console.error(data);
            }
            break;
          }
          case "Subscribe":
          case "Unsubscribe":
            //console.log(data);
            break;
          case "Data": {
            const handles = this.handles[data.channel];
            if (handles) {
              handles.forEach(handle => handle(data.data));
            }
          }
        }
      },

      listener: function (chancel, param, handle) {
        this.handles[chancel] = [handle];
        this.send(JSON.stringify({action: "Subscribe", channel: chancel + (param ? ":" + param : "")}));
      },
      unListener: function (chancel) {
        delete this.handles[chancel];
        this.send(JSON.stringify({action: "Unsubscribe", channel: chancel}));
      },
      connect: function (onOpen) {
        this.url = url;
        this.onOpen = onOpen;
        //this.onMessage = onMessage;
        const ws = this.ws = new WebSocket(url);

        ws.onopen = () => {
          this.status = true;
          onOpen();
        };
        ws.onmessage = this.handleMessage.bind(this);
        ws.onclose = data => {
          this.status = false;
          console.error("链接已关闭:", data);
        };
        ws.onerror = err => {
          console.error("连接发生异常:", err);
        }
      },
      send: function (msg) {
        this.ws.send(msg)
      },
      beat: function (command) {
        const sent = () => {
          setTimeout(() => {
            if (this.status) {
              try {
                this.send(command);
              } catch (e) {
                console.log(e)
              }
              sent();
            } else {
              this.reLoad();
            }
          }, 5000);
        };
        sent();
      }
    }
  }
}

const ws = {};

/**
 * @disc: 创建websocket
 * @params: wsUrl, channel, param, handle, handleErr
 * @date: 2020-01-15 11:27
 * @author: Wave
 */
export function listener(wsUrl, channel, param, handle, handleErr) {
  console.log("启动:" + channel);
  if (ws[wsUrl]) {
    ws[wsUrl].listener(channel, param, handle);
  } else {
    const wsConn = new _WebSocketBuilder().buildWs.bind({})(wsUrl, handleErr);
    wsConn.connect(() => {
      console.log(wsUrl + " connected");
      ws[wsUrl] = wsConn;
      ws[wsUrl].listener(channel, param, handle);
    });
  }
}

/**
 * @disc: 关闭 websocket
 * @params: wsUrl, channel
 * @date: 2020-01-15 11:28
 * @author: Wave
 */
export function unListener(wsUrl, channel) {
  console.log("关闭:" + channel);
  if (ws[wsUrl]) {
    ws[wsUrl].unListener(channel);
    return;
  } else {
    console.log("没有websocket任务，不需要关闭")
  }
}
