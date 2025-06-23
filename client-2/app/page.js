import Image from "next/image";
import styles from "./page.module.css";
// import {EventScheduler} from "../components/EventScheduler.jsx";
import EventScheduler from '../components/EventScheduler.jsx';

export default function Home() {
  return (
    <div>
      <EventScheduler />
    </div>
  );
}
