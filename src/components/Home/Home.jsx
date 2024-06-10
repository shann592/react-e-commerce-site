import { iphone, mac } from '../../assets'
import FeaturedProducs from './FeaturedProducs'
import HeroSection from './HeroSection'

function Home() {
  return (
    <div>
      <HeroSection
        title="Buy Iphone 14 Pro"
        subTitle="Expirience the power of the latest iPhone 14 with our most Pro camer ever."
        link="/products/6652d24e420a49e63884d8a3"
        image={iphone}
      />
      <FeaturedProducs />
      <HeroSection
        title="Build the ultimate setup"
        subTitle="You can add Studio Display and colour-matched Magic accessories to your bag after configure you"
        link="/products/6652d24e420a49e63884d8ab"
        image={mac}
      />
    </div>
  )
}
export default Home
