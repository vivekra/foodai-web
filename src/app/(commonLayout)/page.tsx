import { Hero } from '@/components/home/Hero';
import { CategorySlider } from '@/components/home/CategorySlider';
import { FeaturedRestaurants } from '@/components/home/FeaturedRestaurants';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <CategorySlider />
        <FeaturedRestaurants />
      </div>
    </div>
  );
}
