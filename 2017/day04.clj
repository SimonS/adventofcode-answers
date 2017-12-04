(require '[clojure.string :as str])

(def normalised-data
  (->> (slurp "2017/inputs/day04.txt")
       str/split-lines))

(defn password-has-unique-words? [passphrase]
    (let [tokens (str/split passphrase #" ")]
        (= (count (set tokens)) (count tokens))))

; pt 1:
(count (filter password-has-unique-words? normalised-data))

(defn password-has-no-anagrams? [passphrase]
    (let [tokens (str/split passphrase #" ")
          sorted-tokens (map sort tokens)]
        (= (count (set sorted-tokens)) (count sorted-tokens))))

; pt 2:
(count (filter password-has-no-anagrams? normalised-data))

