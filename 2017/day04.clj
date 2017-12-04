(require '[clojure.string :as str])

(def normalised-data
  (->> (slurp "2017/inputs/day04.txt")
       str/split-lines))

(defn tokenize [word]
    (str/split word #" "))

(defn is-unique? [lst] 
    (= (count (set lst)) (count lst)))

(defn password-has-unique-words? [passphrase]
    (is-unique? (tokenize passphrase)))

; pt 1:
(count (filter password-has-unique-words? normalised-data))

(defn password-has-no-anagrams? [passphrase]
    (->> (tokenize passphrase)
         (map sort)
         is-unique?))

; pt 2:
(count (filter password-has-no-anagrams? normalised-data))
