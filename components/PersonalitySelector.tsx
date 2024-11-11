import { Personality } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { Brain, Sparkles, Heart, Moon } from 'lucide-react';

interface PersonalitySelectorProps {
  selected: string;
  onSelect: (personality: Personality) => void;
}

export function PersonalitySelector({ selected, onSelect }: PersonalitySelectorProps) {
  const personalities: Array<{ id: Personality; icon: React.ReactNode; label: string }> = [
    { id: 'Charming', icon: <Brain className="w-4 h-4" />, label: 'Charming' },
    { id: 'Witty', icon: <Sparkles className="w-4 h-4" />, label: 'Witty' },
    { id: 'Flirty', icon: <Heart className="w-4 h-4" />, label: 'Flirty' },
    { id: 'Mysterious', icon: <Moon className="w-4 h-4" />, label: 'Mysterious' },
  ];

  return (
    <div className="flex gap-2 justify-center">
      {personalities.map(({ id, icon, label }) => (
        <Button
          key={id}
          variant={selected === id ? 'default' : 'outline'}
          onClick={() => onSelect(id)}
          className="flex items-center gap-2"
        >
          {icon}
          {label}
        </Button>
      ))}
    </div>
  );
}