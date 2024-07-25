/*
 * @Author: 关振俊
 * @Date: 2024-06-07 10:51:26
 * @LastEditors: 关振俊
 * @LastEditTime: 2024-06-07 17:23:27
 * @Description:
 */
// import Image from "next/image";
import {
  IconCalendarClock,
  IconCommand,
  IconHome,
  IconMindMapping,
  IconUser,
} from "@arco-design/web-react/icon";
import "./home.less";
import { Image } from "@arco-design/web-react";
import { useState } from "react";

const Home: React.FC = () => {
  const [menuActive, setMenuActive] = useState<number>(0);
  const menuList = [
    { icon: <IconHome /> },
    { icon: <IconUser /> },
    { icon: <IconCalendarClock /> },
    { icon: <IconCommand /> },
    { icon: <IconMindMapping /> },
  ];
  const activeList = [
    {
      src: "/activeImg1.jpg",
      title: "tennis",
    },
    {
      src: "/activeImg2.jpg",
      title: "hiking",
    },
    {
      src: "/activeImg3.jpg",
      title: "running",
    },
    {
      src: "/activeImg4.jpg",
      title: "cycling",
    },
    {
      src: "/activeImg5.jpg",
      title: "yoga",
    },
    {
      src: "/activeImg6.jpg",
      title: "swimming",
    },
  ];
  const ImgItemList = () => (
    <>
      <div className="active_imgList_left">
        <div key={activeList[0].title} className={`active_imgItem`}>
          <Image
            src={activeList[0].src}
            alt={activeList[0].title}
            preview={false}
          ></Image>
          <div className="active_imgItem_overlay">{activeList[0].title}</div>
        </div>
        <div key={activeList[1].title} className={`active_imgItem`}>
          <Image
            src={activeList[1].src}
            alt={activeList[1].title}
            preview={false}
          ></Image>
          <div className="active_imgItem_overlay">{activeList[1].title}</div>
        </div>
      </div>

      <div key={activeList[2].title} className={`active_imgItem singleShow`}>
        <Image
          src={activeList[2].src}
          alt={activeList[2].title}
          preview={false}
        ></Image>
        <div className="active_imgItem_overlay">{activeList[2].title}</div>
      </div>

      <div className="active_imgList_right">
        <div key={activeList[3].title} className={`active_imgItem`}>
          <Image
            src={activeList[3].src}
            alt={activeList[3].title}
            preview={false}
          ></Image>
          <div className="active_imgItem_overlay">{activeList[3].title}</div>
        </div>
        <div key={activeList[4].title} className={`active_imgItem`}>
          <Image
            src={activeList[4].src}
            alt={activeList[4].title}
            preview={false}
          ></Image>
          <div className="active_imgItem_overlay">{activeList[4].title}</div>
        </div>
        <div key={activeList[5].title} className={`active_imgItem`}>
          <Image
            src={activeList[5].src}
            alt={activeList[5].title}
            preview={false}
          ></Image>
          <div className="active_imgItem_overlay">{activeList[5].title}</div>
        </div>
      </div>
    </>
  );
  return (
    <div className="home_wrap">
      <main>
        <nav className="main_menu">
          <div className="menu_logo">
            <Image
              src="/logo.png"
              width="30"
              alt="logo"
              preview={false}
            ></Image>
          </div>
          <div className="menu_list">
            {menuList.map((p, pi) => (
              <div
                key={pi}
                className={`menu_item ${menuActive === pi ? "active" : ""}`}
                onClick={() => setMenuActive(pi)}
              >
                <b></b>
                <b></b>
                {p.icon}
              </div>
            ))}
          </div>
        </nav>
        <section className="main_content">
          <div className="left_content">
            <div className="left_content_active">
              <div className="active_title">Popular Activities</div>
              <div className="active_imgList">
                <ImgItemList />
              </div>
            </div>
            <div className="left_content_bottom">
              <div className="left_bottom_item">
                <div className="left_bottom_item_title">Weekly Schedule</div>
                <div className="left_bottom_item_list">
                  {new Array(4).fill("").map((_, pi) => (
                    <div key={pi} className="left_bottom_item_listItem">
                      <div className="listItem_left">
                        <div className="listItem_date">
                          <div>13</div>
                          <div>MON</div>
                        </div>
                        <div className="listItem_line"></div>
                        <div className="listItem_info">
                          <div>Swimming</div>
                          <div className="listItem_info_imgList">
                            {new Array(4).fill("").map((_, pi) => (
                              <Image
                                key={pi}
                                src="/avatar.jpg"
                                alt="avatar"
                                preview={false}
                                width="28"
                              ></Image>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="listItem_right">
                        <div className="listItem_right_btn">Join</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="left_bottom_item">
                <div className="left_bottom_item_title">Personal Bests</div>
                <div  className="left_bottom_item_card">

                {new Array(3).fill("").map((p, pi) => (
                  <div className="card_item" key={pi}>
                      <div className="card_text">Fastest 5K Run: 22min</div>
                    <Image
                      key={pi}
                      src="/run.png"
                      alt="run"
                      preview={false}
                    ></Image>
                  </div>
                ))}
              </div>
              </div>

            </div>
          </div>
          <div className="right_content">r</div>
        </section>
      </main>
    </div>
  );
};
export default Home;
